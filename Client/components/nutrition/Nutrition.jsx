import React from "react";

function Rows(props) {



  return (
    <div className="row">
      <span className={props.class}>
        <span className="nutrition-bold">{props.name}</span>
        {props.amount && props.unit ?
          (<>
            <span>{props.amount}</span>
            <span>{props.unit}</span>
          </>)
          : null}
      </span>
      <span>
        <span className="">{props.percent}</span>
      </span>
    </div>
  )
}


function Nutrition(props) {
  console.log(props);

  const {
    calories,
    totalFat,
    satFat,
    transFat,
    cholestrol,
    sodium,
    carbs,
    fiber,
    sugar,
    protein,
    vitaminA,
    vitaminD,
    vitaminC } = props.nutritionFacts;
  return (
    <div className="nutritionFacts">
      <h2>Nutrition Facts</h2>
      <div className="servingSize"></div>
      <div className="calories">
        <p>Amount per serving</p>
        <Rows name="calories" percent={calories}></Rows>
      </div>
      <div className="intake">
        <Rows name="total fat" amount={totalFat.amount} unit={totalFat.unit} percent={totalFat.percent}></Rows>
        <Rows name="saturated fat" class={'children'} amount={satFat.amount} unit={satFat.unit} percent={satFat.percent}></Rows>
        <Rows name="trans fat" class={'children'} amount={transFat.amount} unit={transFat.unit} percent={transFat.percent}></Rows>
        <Rows name="cholestrol" amount={cholestrol.amount} unit={cholestrol.unit} percent={cholestrol.percent}></Rows>
        <Rows name="sodium" amount={sodium.amount} unit={sodium.unit} percent={sodium.percent}></Rows>
        <Rows name="carbs" amount={carbs.amount} unit={carbs.unit} percent={carbs.percent}></Rows>
        <Rows name="fiber" amount={fiber.amount} unit={fiber.unit} percent={fiber.percent}></Rows>
        <Rows name="sugar" amount={sugar.amount} unit={sugar.unit} percent={sugar.percent}></Rows>
        <Rows name="protein" amount={protein.amount} unit={protein.unit} percent={protein.percent}></Rows>
      </div>
      <div className="vitamins">
        <Rows name="vitaminA" amount={vitaminA.amount} unit={vitaminA.unit} percent={vitaminA.percent}></Rows>
        <Rows name="vitaminD" amount={vitaminD.amount} unit={vitaminD.unit} percent={vitaminD.percent}></Rows>
        <Rows name="vitaminC" amount={vitaminC.amount} unit={vitaminC.unit} percent={vitaminC.percent}></Rows>
      </div>
      <footer>* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily deit. 2,000 calories a day is used for general nutrition advice.</footer>
    </div>
  )
}

export default Nutrition;