import React from 'react'
export const getStaticProps = async () => {
    const res = await fetch('http://localhost:3001/people');
    const data = await res.json();

    console.log(data)

    return {
        props: { people: data }
    }
}

function TablePeople({ people }) {
    console.log(people)
    return (
        <div>TablePeople for </div>
    )
}

export default TablePeople