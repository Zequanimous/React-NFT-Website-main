import React,{useState, useEffect} from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import "../styles/nft-details.css";

import { Link } from "react-router-dom";

import {avas} from "../assets/data/data"
import {getSaleFromId, buy} from "../helper_functions/salehandler"

const NftDetails = (props) => {
  // redirection if transaction is successful
  const urlParams = new URLSearchParams(window.location.search);
  const txhash = urlParams.get("transactionHashes")
  if(txhash !== null){
    // Show a congratulatory message for the successful transaction here 
    window.location.href = '../../React-NFT-Website-main#/market'
  }

  const {wallet, marketplaceContract, accountId} = props.mainObject;
  const { nftContract, tokenId } = useParams();
  const [sale, setSale] = useState();
  const [title, setTitle] = useState('');
  const [priceToDisplay, setPriceToDisplay] = useState('');
  const [creatorImg, setCreatorImg] = useState(avas[Math.floor(Math.random() * 6)]);
  const [imgUrl, setImgUrl] = useState('');
  const [owner_id, setOwner] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(()=>{
    async function fetchObject(){
      const object = await getSaleFromId(wallet, marketplaceContract, nftContract, tokenId);
      setRelevantStuff(object.sale, object.token);
    }
    fetchObject()
  },[])

  const setRelevantStuff = (sale, token) =>{
    setSale(sale);
    setTitle(token.metadata.title);
    setPriceToDisplay( (sale.price/(10**24)).toFixed(1) );

    setImgUrl(token.metadata.media);

    if(token.base_uri){
      setImgUrl(token.base_uri + '/' + token.metadata.media);
    }
    setOwner(sale.owner_id);
    setDesc(token.metadata.description);
  }

  const buyButtonListener = ()=>{
     buy(wallet, marketplaceContract, accountId, tokenId, sale);
  }

  return (
    <>
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={imgUrl}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{title}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i className="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i className="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i className="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i className="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__img">
                    <img src={creatorImg} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{owner_id}</h6>
                  </div>
                </div>

                <p className="my-4">{desc}</p>
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100" onClick={buyButtonListener}>
                  <i className="ri-shopping-bag-line"></i>
                  Buy for {priceToDisplay} NEAR
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <LiveAuction />
    </>
  );
};

export default NftDetails;
