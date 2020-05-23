import chai, { expect } from 'chai';
import app from '../index';
import chaiHttp from 'chai-http';

import sequelize from '../models/index';
import Recipes from '../models/recipes.model';
import Users from '../models/users.model';
import Comments from '../models/comments.model';
import Category from '../models/category.model';
import Stuffs from '../models/stuffs.model';
import { doesNotMatch } from 'assert';

chai.use(chaiHttp);

async function deleteUser() {
  Users.destroy({ where: { id: 1 } });
}
async function makeUser() {
  Users.create({
    email: 'test1@test',
    password: 'password',
    username: 'tt_tt',
  });
}

describe('sign up test', () => {
  it('return value test', done => {
    chai
      .request(app)
      .post('/user/signup')
      .send({ email: 'test1@test', password: 'password', username: 'tt_tt' })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.status(200);
        expect(res.body.email).to.equal('test1@test');
        expect(res.body.username).to.equal('tt_tt');
        done();
      });
  });
});

describe('sign in test', () => {
  it('not sign in when not wrong password', done => {
    chai
      .request(app)
      .get('/user/signin')
      .send({ email: 'test1@test', password: 'password1' })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.status(401);
        done();
      });
  });
  it('given token', done => {
    chai
      .request(app)
      .get('/user/signin')
      .send({ email: 'test1@test', password: 'password' })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.status(201);
        expect(res.body).have.key('token');
        done();
      });
  });
});

describe('add stuff test', () => {
  it('post category', done => {
    chai
      .request(app)
      .post('/stuff/category')
      .send({ name: '육류' })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.status(200);
        done();
      });
  });
  it('post stuff', done => {
    chai
      .request(app)
      .post('/stuff/stuff')
      // .send({ stuffname: '돼지고기', limitday: '7days', categoryId: 1 })
      .send({ stuffname: '돼지고기', limitday: '7days' })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.status(200);
        expect(res.body.stuffname).to.equal('돼지고기');
        // expect(res.body.categoryId).to.equal(1);
        done();
      });
  });
});

describe('mypage test', () => {
  it('given user information when given token', done => {
    const agent = chai.request.agent(app);
    agent
      .get('/user/signin')
      .send({ email: 'test1@test', password: 'password' })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        agent
          .get('/mypage')
          .send({ token: res.body.token })
          .end((err1, res1) => {
            if (err1) {
              done(err1);
              return;
            }
            expect(res1.body.email).equal('test1@test');
            done();
          });
      });
  });
  it('add stuff where mypage', done => {
    const agent = chai.request.agent(app);
    agent
      .get('/user/signin')
      .send({ email: 'test1@test', password: 'password' })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.body).to.have.key('token');
        agent
          .post('/mypage/stuff')
          .send({ token: res.body.token, id: 1 })
          .end((err2, res2) => {
            if (err2) {
              done(err2);
              return;
            }
            expect(res2).to.have.status(201);
            agent
              .get('/mypage')
              .send({ token: res.body.token })
              .end((err3, res3) => {
                if (err3) {
                  done(err3);
                  return;
                }
                expect(res3.body.stuffs.length).to.equal(1);
                expect(res3.body.stuffs[0].stuffname).to.equal('돼지고기');
                done();
              });
          });
      });
  });
});

describe('test comment', () => {
  before(async () => {
    await Recipes.create({
      userId: 1,
      name: '계란볶음밥',
      desc: '계란을 볶은뒤 밥을넣고 열심히 볶는다',
      image:
        'https://recipe1.ezmember.co.kr/cache/recipe/2018/04/04/833880e807106a8288be48259b19c4031.jpg',
    });
  });
  it('post comment test', done => {
    const agent = chai.request.agent(app);
    agent
      .get('/user/signin')
      .send({ email: 'test1@test', password: 'password' })
      .end((err1, res1) => {
        if (err1) {
          console.log('err1');
          done(err1);
          return;
        }
        expect(res1).to.have.status(201);
        expect(typeof res1.body.token).to.equal('string');
        // recipeId,comment
        agent
          .post('/comment')
          .send({
            token: res1.body.token,
            recipeId: 1,
            comment: 'testing comment in recipe1',
          })
          .end((err3, res3) => {
            if (err3) {
              console.log('err3');
              done(err3);
            }
            console.log(res3.body);
            expect(res3).to.have.status(201);
            done();
          });
      });
  });
});

// describe('get multiple comment where recipe', () => {
//   before(async () => {
//     await Comments.create({
//       userId: 1,
//       recipeId: 1,
//       comment: 'testing comment in recipe1_2',
//     });
//   });
//   it('get 2 comments ', done => {
//     const agent = chai.request.agent(app);
//     agent
//       .get('/user/signin')
//       .send({ email: 'test1@test', password: 'password' })
//       .end((err1, res1) => {
//         if (err1) {
//           done(err1);
//         }
//         Recipes.findOne({ where: { id: 1 }, include: [Comments] }).then(
//           (res: any): any => {
//             console.log(res.comments);
//             expect(res.comments.length).to.equal(2);
//             done();
//           }
//         );
//       });
//   });
// });

// Recipes.findOne({ where: { id: 1 }, include: [Comments] }).then(
//   (res: any): any => {
//     console.log(res);
//     expect(res.comments.length).to.equal(2);
//     res.comments.forEach((el: any, index: number): void => {
//       expect(el.comment).to.equal(`testing comment in recipe${index + 1}`);
//       expect(el.userId).to.equal(1);
//     });

// agent
//   .post('/comment')
//   .send({
//     token: res1.body.token,
//     recipeId: 1,
//     comment: 'testing comment in recipe2',
//   })
//   .end((err3, res3) => {
//     if (err3) {
//       console.log('err3');
//       done(err3);
//     }
//     expect(res3).to.have.status(201);
//   }),
