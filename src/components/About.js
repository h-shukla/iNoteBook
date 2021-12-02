import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
    const a = useContext(NoteContext);

    return (
        <div className="container p-3">
          <h1>About iNotebook</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas dolores voluptatem alias, laboriosam quibusdam, quo nesciunt ipsa recusandae velit tenetur debitis corrupti quos impedit pariatur molestiae iure libero explicabo error suscipit ad tempora maiores. Repellendus laborum at et culpa aut est tenetur dicta vel harum tempora ducimus, maiores autem. Et quaerat suscipit veniam minima aperiam delectus fugit libero repudiandae dolore distinctio dolorem ipsum, consequatur quam asperiores, numquam illum provident nam! Consequatur modi facere voluptas minus quisquam ad assumenda ipsa, repudiandae corrupti pariatur recusandae aut voluptates dolores blanditiis ut odit vel voluptatibus labore accusantium non vero, natus quam! Tempora, voluptatem!</p>
        </div>
    );
}

export default About;
