import React from "react";
import TVPresenter from "./TVPresenter";

const TVContainer = class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null,
  };
  render() {
    const { topRated, popular, airingToday, error, loading } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        error={error}
        loading={loading}
      />
    );
  }
};

export default TVContainer;
