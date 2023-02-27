import { GiKnifeFork } from 'react-icons/gi';
import { SlLogout } from 'react-icons/sl';
import { Link } from "react-router-dom";

const HomePageHeader = () => {
    return (
        <>
            <section>
                <div id="header-top-layer">
                    <div>
                        <Link to="/homepage">
                            <div id="reciepe-app-logo">
                                <div><GiKnifeFork /></div>
                                <div>Recipe App</div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/">
                            <div id="logout-btn">
                                <div><SlLogout /></div>
                                <div>Logout</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div>
                    <input id="homepg-search-input" type="search" placeholder="🔍" />
                </div>
            </section>
        </>
    )
}

export default HomePageHeader