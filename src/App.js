import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import StartScreen from "./Components/StartScreen/StartScreen";
import SubjectMenu from "./Components/ChoiseSubject/MainPage";
import PageMenu from "./Components/PageMenu/PageMenu";
import Admins from "./Components/Admins/Admins";
import Menu from "./Components/TopMenu/TopMenu";
import AboutUs from "./Components/AboutUs/AboutUs";
import UserfulLink from "./Components/UsefulLinks/UsefulLinks";
import FullProject from "./Components/Project/FullProject";
import CreateProject from "./Components/Project/CreateProject";
import PostsRender from "./Components/PostsRender/PostsRender";
import Logaut from "./Components/Logaut/Logaut";
import CreatePost from "./Components/CreatePost/CreatePost";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="logaut">
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
          <Route path="/:subject/admins" render={() => <Admins />} />
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
          <Route
            path="/:subject/links"
            render={() => (
              <div>
                <Menu />
                <UserfulLink />
              </div>
            )}
          />
          <Route path="/menu" exact render={() => <SubjectMenu />} />
          <Route path="/:subject" render={() => <PageMenu />} />
          <Route path="/" exact render={() => <StartScreen />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
