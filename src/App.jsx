import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import PokedexPage from './pages/PokedexPage.jsx';
import PokemonDetailsPage from './pages/PokemonDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<PokedexPage />} />
                <Route
                    path="/pokemon/:identifier"
                    element={<PokemonDetailsPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}