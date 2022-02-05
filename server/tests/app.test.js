import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '@app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test to display api message', () => {

  it('should display message I am alive at this port', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.message).to.equal('I am alive at this port');
        expect(res.body).to.have.property('status');
        done();
      });
  });
});
