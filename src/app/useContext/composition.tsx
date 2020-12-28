
/** Example of composition */
import * as React from 'react';

/** 
 * Contoh implmentasi Component Composition
 * 
 * Kata kuncinya ada pada kata ini: 'so that the intermediate components don’t need to know about another component props' artinya, antara komponen luar / containment tidak usah peduli dengan props yang berada di komponen anak / specialization
 * 
 * Intinya component composition adalah suatu react pattern yang tujuannya adalah sebagai terusan yang dipassing melalui props. Mirip seperti { props.children }. Contoh:
 * 
 * function ButtonText(){
 * return <span>
 * }
 * function Button(props){
 *    return <button> { props.render } </button
 * }
 * 
 * function Container(){
 *    return <Button render={ButtonText}/>
 * }
 * 
*/

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
            desc='https://reactjs.org/docs/composition-vs-inheritance.html#gatsby-focus-wrapper'
            title='Component Composition'
        />
    )
}


export default Page;