import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

import { Row, Container, Button } from "react-bootstrap";

export default function SavedCocktails() {
  const { loading, data } = useQuery(QUERY_ME);
  const profile = data?.me || data?.user || {};

  let itemData = [];

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(profile);
  itemData = profile.cocktails;

  return (
    <>
      <style type="text/css">
        {`

    .profileN {
      text-align: center;
      margin-top: 200px;
      font-family: 'Norican', cursive;
      font-size: 80px;
      padding-bottom: 40px;
    }
    .MuiImageListItem-img {
      border-radius: 25px;
    }
    #imgC {
      padding: 10px;
    }
    // .borderB {
    //   border-style: solid;
    //   border-width: 2px;
    //   border-radius: 25px;
    // }
    .center {
      text-align: center;
      max-width: 100%;
    }
    `}
      </style>
      <Container>
      <h1 className="profileN">{`${profile.username}'s Cocktails!`}</h1>
      <ImageList
        className="borderB"
        sx={{ width: "100%", height: 1200, padding: "20px" }}
        cols={3}
        rowHeight={164}
      >
        {itemData.map((item) => (
          <div>
            <Row className="center">
              <Button
                variant="outline-dark"
                type="button"
              >
                ✧{item.name}✧
              </Button>
              </Row>
            <ImageListItem key={item.image} id="imgC">
              <img
                src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
              />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
      </Container>
    </>
  );
}
