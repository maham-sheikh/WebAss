import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '1rem', backgroundColor: '#6380a1', marginBottom: '1rem' }}>
            <Link to="/" style={{ marginRight: '1rem' , color:'white' }}>Home</Link>
            <Link to="/add-new-candidate" style={{ marginRight: '1rem' , color:'white'}}>Add New Candidate</Link>
            <Link to="/existing-applications" style={{ marginRight: '1rem' , color:'white'}}>Existing Applications</Link>
        </nav>
    );
};

export default Navbar;
