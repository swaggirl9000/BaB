import React from 'react';

const HomeScreen = ({ startQuiz}) => {
    return (
        <div className="home-screen">
            <h1>Build a Boyfriend</h1>
            <p>Are you ready to meet the man of your dreams?</p>
            <button onClick = {startQuiz} className="start-button">
                Let's start!
            </button>
        </div>
    );
};

export default HomeScreen;