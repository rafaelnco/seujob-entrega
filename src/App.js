import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Box, Text, Input, Navigator, Path } from "./Components";

import { ListJobs, SubmitJob, TakeChallenge } from "./Scenes";

import { applyTheme, unit, availableThemes } from "./Appearance";

import "./App.css";

const request = require("request");

const inputEvent = handler => ({ target }) => handler(target.value);

const Service = (endpoint, callback) => {
  request(`https://seujob.herokuapp.com/${endpoint}`, callback);
};
const requestToken = callback => {
  Service("request", (error, response, body) => {
    callback(body);
  });
};

function App() {
  const [theme, setTheme] = useState(0);
  const [token, setToken] = useState();
  const [filter, useFilter] = useState("");
  const [scene, setScene] = useState(0);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [scenes] = useState([
    {
      title: "Pesquise",
      component: ListJobs
    },
    {
      title: "Publique",
      component: SubmitJob
    },
    {
      title: "Aguarde",
      component: TakeChallenge
    }
  ]);
  const refresh = () => {
    request(
      "https://api.github.com/repos/seujob/hot/issues",
      (error, response, body) => {
        if (!error) setPosts(JSON.parse(body));
      }
    );
  };
  useEffect(refresh, []);
  const generateId = () => Math.random().toString();
  const addNotification = text => {
    let idNew = generateId();
    while (notifications.filter(({ id }) => id === idNew).length)
      idNew = generateId();
    setNotifications(notifications.concat({ text, idNew }));
    // setTimeout(() => removeNotification(id), 5000)
    return idNew;
  };
  const removeNotification = idRemove => {
    setNotifications(notifications.filter(({ id }) => id !== idRemove));
  };
  const submit = ({
    title,
    detail1,
    detail2,
    detail3,
    link1,
    link2,
    link3,
    callback
  }) => {
    setScene(2);
    const clause = [
      title,
      detail1,
      detail2,
      detail3,
      encodeURIComponent(link1),
      encodeURIComponent(link2),
      encodeURIComponent(link3)
    ].join("/");
    const submitForm = (retry = 5) => {
      if (!retry) {
        setScene(1);
        addNotification("Tente novamente nos próximos minutos");
      }
      if (token) {
        Service(`challenge/${clause}/${token}`, (error, response) => {
          if (!error && response.statusCode === 403) {
            setScene(0);
            addNotification("Submissão confirmada!");
            if (callback) callback();
          } else if (error || response.statusCode === 404) {
            setTimeout(() => submitForm(retry - 1), 5000);
          }
        });
      } else {
        requestToken(acquiredToken => {
          if (acquiredToken) setToken(acquiredToken);
          setTimeout(() => submitForm(retry - 1), 5000);
        });
      }
    };
    submitForm();
  };
  useEffect(() => {
    const id = addNotification("Bem vindo!");
    setTimeout(() => removeNotification(id), 5000);
  }, []);
  return (
    <Box vertical full-height secondary-background>
      <Box horizontal align-center normal-shadow two-apex>
        <Box
          sub-padding
          small-padding-horizontal
          pointer-cursor
          pressOut={() => {
            const newTheme = (theme + 1) % availableThemes.length;
            applyTheme(newTheme);
            setTheme(newTheme);
          }}
        >
          <svg viewBox="0 0 100 100" height={unit(7)} width={unit(7)}>
            <Path d="M 72.180255,14.621704 V 33.071883 Q 72.180255,35.337698 73.151318,36.678688 74.168625,37.973435 76.388191,37.973435 78.607762,37.973435 79.671307,36.678688 80.734852,35.337698 80.734852,33.071883 V 14.621704 H 90.954123 V 33.071883 Q 90.954123,37.742233 89.011998,41.071588 87.069877,44.354704 83.694279,46.019379 80.318681,47.684059 76.156989,47.684059 71.995292,47.684059 68.758419,46.019379 65.56779,44.354704 63.764384,41.071588 61.960984,37.788472 61.960984,33.071883 V 14.621704 Z M 46.70145,22.806373 V 26.829345 H 56.874483 V 34.551599 H 46.70145 V 39.175706 H 58.261712 V 47.360369 H 36.435937 V 14.621704 H 58.261712 V 22.806373 Z M 20.34414,47.684059 Q 14.471526,47.684059 10.633519,44.955834 6.8417534,42.181371 6.5180656,36.863652 H 17.430954 Q 17.662159,39.684354 19.927971,39.684354 20.76031,39.684354 21.315202,39.314426 21.916336,38.89826 21.916336,38.065917 21.916336,36.909891 20.667827,36.216279 19.419319,35.476418 16.783579,34.551599 13.639188,33.441816 11.558341,32.378271 9.523734,31.314726 8.0440205,29.280119 6.5643071,27.245511 6.610548,24.054882 6.610548,20.864248 8.2289849,18.644676 9.8936627,16.378866 12.714367,15.222839 15.581312,14.066813 19.141873,14.066813 25.153209,14.066813 28.667529,16.841276 32.22809,19.615739 32.413054,24.656012 H 21.361443 Q 21.315202,23.268783 20.667827,22.667648 20.020453,22.066518 19.095632,22.066518 18.448257,22.066518 18.032087,22.528928 17.615918,22.945094 17.615918,23.731193 17.615918,24.840981 18.818185,25.580836 20.066694,26.274453 22.748675,27.291754 25.846825,28.447781 27.83519,29.511326 29.869796,30.574871 31.34951,32.470753 32.829224,34.366635 32.829224,37.23358 32.829224,40.23925 31.34951,42.643781 29.869796,45.002078 27.049092,46.343068 24.228388,47.684059 20.34414,47.684059 Z M 90.788975,68.496304 Q 93.89942,69.225314 95.60044,71.509544 97.350063,73.74517 97.350063,76.709809 97.350063,81.229672 94.336823,83.708305 91.372184,86.138336 85.783107,86.138336 H 67.752267 V 51.729081 H 85.297102 Q 90.545975,51.729081 93.559215,54.013311 96.572451,56.297541 96.572451,60.671598 96.572451,63.684838 94.968634,65.774665 93.413409,67.815895 90.788975,68.496304 Z M 78.54161,65.142859 H 82.721269 Q 84.17929,65.142859 84.859698,64.55965 85.588709,63.97644 85.588709,62.761425 85.588709,61.497807 84.859698,60.914603 84.17929,60.282792 82.721269,60.282792 H 78.54161 Z M 83.45028,77.487421 Q 84.908295,77.487421 85.588709,76.952814 86.317714,76.369605 86.317714,75.105987 86.317714,72.627354 83.45028,72.627354 H 78.54161 V 77.487421 Z M 47.542062,86.47854 Q 42.681997,86.47854 38.599542,84.19431 34.565689,81.91008 32.184257,77.876227 29.802825,73.842369 29.802825,68.787906 29.802825,63.73344 32.184257,59.699582 34.565689,55.66573 38.599542,53.430102 42.681997,51.145872 47.542062,51.145872 52.402125,51.145872 56.435978,53.430102 60.469836,55.66573 62.802663,59.699582 65.184097,63.73344 65.184097,68.787906 65.184097,73.842369 62.802663,77.876227 60.469836,81.91008 56.387381,84.19431 52.353523,86.47854 47.542062,86.47854 Z M 47.542062,76.418207 Q 50.749704,76.418207 52.499329,74.376977 54.248952,72.28715 54.248952,68.787906 54.248952,65.240058 52.499329,63.198833 50.749704,61.109006 47.542062,61.109006 44.285818,61.109006 42.536195,63.198833 40.786571,65.240058 40.786571,68.787906 40.786571,72.28715 42.536195,74.376977 44.285818,76.418207 47.542062,76.418207 Z M 27.429053,51.729081 V 73.939574 Q 27.429053,80.111855 24.172809,83.319499 20.965167,86.47854 15.133089,86.47854 8.8636054,86.47854 5.1699562,83.027897 1.476307,79.577248 1.476307,72.967558 H 12.119849 Q 12.119849,75.05739 12.800258,75.932201 13.480667,76.758411 14.647083,76.758411 15.619095,76.758411 16.153703,76.126605 16.68831,75.494793 16.68831,73.939574 V 51.729081 Z" />
          </svg>
        </Box>
        {scene === 0 && (
          <Box justify-between full-flex>
            <Box small-padding>
              <Input
                giant-text
                disabled-foreground
                value={filter}
                onChange={inputEvent(useFilter)}
                placeholder="Pesquise aqui..."
              />
            </Box>
            <Box
              align-center
              small-padding
              pointer-cursor
              pressOut={() => {
                setScene(1);
                requestToken(
                  acquiredToken => acquiredToken && setToken(acquiredToken)
                );
              }}
            >
              <Text giant-text link-foreground>
                {scenes[1].title}
              </Text>
            </Box>
          </Box>
        )}
        {scene === 1 && (
          <Box full-flex justify-end>
            <Box pointer-cursor small-padding pressOut={() => setScene(0)}>
              <Text giant-text link-foreground>
                {scenes[0].title}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
      <Box justify-center full-flex>
        <Navigator
          scene={scene}
          controller={{ filter, submit, refresh, posts }}
        >
          {scenes}
        </Navigator>
        <Box
          transparent-background
          normal-padding
          zero-bottom
          no-events
          absolute
          two-apex
        >
          {notifications.map(({ text, id }) => {
            return (
              <Box
                key={id}
                all-events
                small-padding
                normal-shadow
                pointer-cursor
                link-background
                monumental-radius
                pressOut={() => removeNotification(id)}
              >
                <Text big-text secondary-foreground>
                  {text}
                </Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
