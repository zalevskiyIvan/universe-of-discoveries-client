import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import StartScreen from "./Components/StartScreen/StartScreen";
import Menu from "./Components/TopMenu/TopMenu";
import AboutUs from "./Components/AboutUs/AboutUs";
import FullProject from "./Components/Project/FullProject";
import CreateProject from "./Components/Project/CreateProject";
import PostsRender from "./Components/PostsRender/PostsRender";
import Logaut from "./Components/Logaut/Logaut";
import CreatePost from "./Components/CreatePost/CreatePost";
import PostTypeMenu from "./Components/PageMenu/PostTypeMenu";
import { actions } from "./Reducers/autorizetReducer";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./Common/hooks";
import { getTokenT } from "./Reducers/autorizetReducer";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isRe_auth = useTypedSelector(
    (state) => state.addPostReducer.statusCode
  );
  useEffect(() => {
    if (localStorage.getItem("auth")) dispatch(actions.setIsAdmin(true));
  }, []);
  useEffect(() => {
    if (isRe_auth === 403) {
      const password = prompt("пароль");
      dispatch(getTokenT(password));
      window.location.reload();
    }
  }, [isRe_auth]);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="helpers">
          <Logaut />
        </div>
        <Switch>
          <Route path="/:subject/project/:id" render={() => <FullProject />} />
          <Route
            path="/:subject/create-project"
            render={() => <CreateProject />}
          />
          <Route
            path="/:subject/:pageType/create"
            render={() => (
              <div>
                <Menu />
                <CreatePost />
              </div>
            )}
          />
          <Route
            path="/:subject/events"
            render={() => (
              <div>
                <Menu />
                <PostsRender type="events" />
              </div>
            )}
          />
          <Route
            path="/:subject/project"
            render={() => (
              <div>
                <Menu />
                <PostsRender type="projects" />
              </div>
            )}
          />
          <Route
            path="/:subject/tasks"
            render={() => (
              <div>
                <Menu />
                <PostsRender type="tasks" />
              </div>
            )}
          />
          <Route
            path="/about"
            render={() => (
              <div>
                <Menu />
                <AboutUs />
              </div>
            )}
          />

          <Route path="/:subject" render={() => <PostTypeMenu />} />
          <Route path="/" exact render={() => <StartScreen />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
