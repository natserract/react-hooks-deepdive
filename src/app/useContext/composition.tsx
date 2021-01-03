
/** Example of composition */
import * as React from 'react';

function ContactBrand(props: any) {
    return <h2>{props.title}</h2>;
}

function ContactNavigation(props: any) {
    return (
        <header className="header">
            <div className="header-container">
                { props.brand } 
                <p>{props.desc}</p>
            </div>
        </header>
    )
}


function ContactContainer(props: any) {
    return (
        <React.Fragment>
            { props.navigation }
        </React.Fragment>
    )
}

function Contact(props: any) {
    const brand = <ContactBrand title={props.title}/>
    const navigation = <ContactNavigation brand={brand} desc={props.desc} />
    return (
        <div className="contact-component">
            <ContactContainer navigation={navigation}/>
        </div>
    )
}

function Page() {
    return (
        <Contact
            desc='https://reactjs.org/docs/composition-vs-inheritance.html'
            title='Component Composition'
        />
    )
}


export default Page;