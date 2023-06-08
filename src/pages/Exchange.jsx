import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "../components/Loader";
import ExchangeCard from "../components/ExchangeCard";
import ErrorComponent from "../components/ErrorComponent";

const Exchange = () => {
  const [exhanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error)
    return (
      <ErrorComponent
        message={
          "Request failed! Could not fetch exchange informtion from API "
        }
      />
    );
  else
    return (
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
              {exhanges.map((i) => (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              ))}
            </HStack>
          </>
        )}
      </Container>
    );
};

export default Exchange;
