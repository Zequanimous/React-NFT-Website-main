import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
// import "./styles/terms.css"
import { Container, Row, Col } from "reactstrap";

const Mytokens = (props) => {

    const {wallet, marketplaceContract, accountId} = props.mainObject;

    const addContractListener = (e) =>{
      const input = e.target.querySelector('input')
      e.preventDefault();
      //addContract(input.value)
    }

    return (
        <>
      <CommonSection title="MY TOKENS" />
      <section>
        <Container>
          <Row>
            <Col lg="10" md="10" className="m-auto text-align">
              <h2>Select Collection</h2>
              <div id='collections'>
                
              </div>
              <h2> Add Collection </h2>
              <form id='contract-form' onSubmit={addContractListener}>
                <input type="text" placeholder="Valid Contract Id" required></input>
                <button type="submit">Submit</button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
    );
};

export default Mytokens;