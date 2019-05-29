import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import NewPaletteForm from "./NewPaletteForm";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedColors
    };
  }
  findPalette = id => {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  };

  savePalette = newPalette => {
    // console.log(newPalette);
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  };
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm
              {...routeProps}
              palettes={this.state.palettes}
              savePalette={this.savePalette}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList palettes={this.state.palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}
