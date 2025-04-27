import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import AddCandidate from './components/AddCandidate';
import ExistingApplications from './components/ViewCandidates';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<AddCandidate />} />
                    <Route path="/add-new-candidate" element={<AddCandidate />} />
                    <Route path="/existing-applications" element={<ExistingApplications />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
