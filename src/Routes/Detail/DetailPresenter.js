import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Section from "Components/Section";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150vh;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 20px;
`;

const IMDB = styled.a`
  color: black;
  height: 10px;
  font-size: 15px;
  font-weight: 700;
  padding: 2px 4px;
  text-decoration: none;
  background-color: yellow;
  border-radius: 5px;
  background-color: #f4c518;
`;

const CompanyContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  & h2 {
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const Companies = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  & img {
    width: 80px;
    object-fit: contain;
  }
  & span {
    font-size: 17px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const TeaserContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  & h2 {
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  width: 100%;
`;

const DetailPresenter = ({ result, error, loading, isMovie }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading... | JMFLIX</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text="Cannot Find Result" color="#e74c3c" />
  ) : (
    <Container>
      {console.log(result)}
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | JMFLIX
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {(result.release_date
                ? result.release_date
                : result.first_air_date
              ).substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id && (
              <>
                <Divider>•</Divider>
                <Item>
                  {result.imdb_id && (
                    <IMDB
                      target="_blank"
                      href={`https://www.imdb.com/title/${result.imdb_id}`}
                    >
                      iMDB
                    </IMDB>
                  )}
                </Item>
              </>
            )}
          </ItemContainer>
          <ItemContainer>
            <Item>
              Production Countries:
              {result.production_countries &&
                result.production_countries.map((country, index) =>
                  index === result.production_countries.length - 1
                    ? ` ${country.name}`
                    : ` ${country.name} /`
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.production_companies && (
            <CompanyContainer>
              <h2>Production Companies</h2>
              <Companies>
                {result.production_companies.map((company) =>
                  company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                      alt={company.name}
                    />
                  ) : (
                    <span>{company.name}</span>
                  )
                )}
              </Companies>
            </CompanyContainer>
          )}
          {!isMovie && (
            <Section title="Seasons">
              {result.seasons.map((season) => (
                <Poster
                  key={season.id}
                  id={season.id}
                  imageUrl={season.poster_path}
                  title={season.name}
                  year={season.air_date}
                  isMovie={isMovie}
                />
              ))}
            </Section>
          )}
          <TeaserContainer>
            <h2>Teasers</h2>
            <VideoContainer>
              {result.videos.results.map(
                (video) =>
                  video.site === "YouTube" && (
                    <iframe
                      width="480"
                      height="270"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  )
              )}
            </VideoContainer>
          </TeaserContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  isMovie: PropTypes.bool.isRequired,
};

export default DetailPresenter;
