import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';

function App() {
  return (
    <div className="bg-broccoli-brown text-primary w-screen h-full flex flex-col items-center justify-center">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
