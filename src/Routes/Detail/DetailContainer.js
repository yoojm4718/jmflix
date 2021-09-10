import React from "react";
import DetailPresenter from "./DetailPresenter";

const DetailContainer = class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };
  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
};

export default DetailContainer;
