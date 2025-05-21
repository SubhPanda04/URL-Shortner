import * as React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Container from './components/container';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
      <Header/>
      <Container/>
      <Footer/>
    </>
  )
};

export default App;
