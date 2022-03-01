import * as React from "react";
import { useMutation } from "@apollo/client";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getCocktailsNameSearch } from "../utils/API";
import { ADD_COCKTAIL, SAVE_COCKTAIL } from "../utils/mutations";
import auth from '../utils/auth';

import {
  Button,
  FormControl,
  Container,
  Col,
  Row,
  Form,
} from "react-bootstrap";

export default function SearchCocktail() {
  const [itemData, setItemData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [addCocktail] = useMutation(ADD_COCKTAIL);
  const [saveCocktail] = useMutation(SAVE_COCKTAIL);

  const handleInputChange = (e) => {
    const { value } = e.target;
    return setSearchTerm(value);
  };

  const searchCocktailDB = async (event) => {
    event.preventDefault();
    // search cocktailDB
    const results = await getCocktailsNameSearch(searchTerm);
    const newItemData = await results.drinks.map((drink) => {
      // combigning the ingredients/measures into one array for the newDrink object
      const ingredients = [];
      for (let i = 1; i < 16; i++) {
        const ingrName = drink[`strIngredient` + i];
        let measureName = drink[`strMeasure` + i];
        if (ingrName === null) {
          break;
        }
        if (measureName === null) {
          measureName = "";
        }
        const newIngredient = {
          ingredient: ingrName,
          measure: measureName,
        };
        ingredients.push(newIngredient);
      }

      // pulling data for each drink
      const newDrink = {
        name: drink.strDrink,
        img: drink.strDrinkThumb,
        isAlcoholic: drink.strAlcoholic === "Alcoholic" ? true : false,
        instructions: drink.strInstructions,
        ingredients,
      };
      return newDrink;
    });
    setItemData(newItemData);
  };

  const saveToDB = async (event) => {
    const drinkIndex = event.target.dataset.drink;
    const drink = itemData[drinkIndex];
    // Save drink to the database
    const newCocktail = await addCocktail({ variables: { name: drink.name, instructions: drink.instructions, image: drink.img, isAlcoholic: drink.isAlcoholic, ingredients: drink.ingredients } });
    // Save that drink to the user's list of cocktails
    const user = await auth.getProfile();
    const newSaveCocktail = await saveCocktail({ variables: { userId: user.data._id, cocktailId: newCocktail.data.addCocktail._id } });
  }

  return (
    <>
      <style type="text/css">
        {`
    .form-control {
      width: 100%;
      margin-top: 20px;
    }

    #search {
      margin-top: 20px;
    }
    .MuiImageListItem-img {
      border-radius: 25px;
    }
    #imgC {
      padding: 10px;
    }
    .center {
      text-align: center;
      max-width: 100%;
    }
    `}
      </style>
      <Container>
        <Form>
          <Form.Group>
            <Row>
              <Col sm={10}>
                <FormControl
                  placeholder="Vodka, Cranberry, Cointreau, Fresh Lime... oh my!"
                  aria-label="Cocktail"
                  aria-describedby="basic-addon1"
                  value={searchTerm}
                  name="searchTerm"
                  onChange={handleInputChange}
                  type="text"
                />
              </Col>
              <Col sm={2}>
                <Button
                  id="search"
                  variant="outline-dark"
                  type="button"
                  onClick={searchCocktailDB}
                >
                  ✧Search✧
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <ImageList
          sx={{ width: "80%", height: 1200, padding: "20px" }}
          cols={3}
          rowHeight={164}
          className="list"
        >
          {itemData.map((item, index) => (
            <div key={item.img}>
              {/* <button type="button" onClick={saveToDB} data-drink={index}>
                {item.name}
              </button> */}
              <Row className="center">
              <Button
                variant="outline-dark"
                type="button"
                onClick={saveToDB}
                data-drink={index}
              >
                ✧{item.name}✧
              </Button>
              </Row>
              <ImageListItem id="imgC">
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
