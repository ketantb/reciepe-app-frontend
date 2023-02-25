import "./homepage.css"
import { GiKnifeFork } from 'react-icons/gi';
import { Link } from "react-router-dom";


const HomePage = () => {
    return (
        <>
            <section id="homepage-container">
                <header>
                    <nav>
                        <Link to="/homepage">
                            <div id="reciepe-app-logo">
                                <div><GiKnifeFork /></div>
                                <div>Reciepe App</div>
                            </div>
                        </Link>
                        <div>
                            <input id="homepg-search-input" type="search" placeholder="" />
                        </div>
                    </nav>
                </header>
            </section>
        </>
    )
}

export default HomePage