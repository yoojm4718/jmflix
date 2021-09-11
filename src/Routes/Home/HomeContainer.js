import { moviesApi } from "api";
import React from "react";
import HomePresenter from "./HomePresenter";

const HomeContainer = class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({ nowPlaying, upcoming, popular });
    } catch {
      this.setState({ error: "Can't Find Movies Information." });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    console.log(this.state);
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
};

export default HomeContainer;
