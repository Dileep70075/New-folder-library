import React from "react";
import { Link } from "react-router-dom";
function BasicExample() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    {/* <li>
                        <Link to="/login">Login</Link>
                    </li> */}
                    <li>
                        <Link to="/totaluser">Total User</Link>
                    </li>
                    <li>
                        <Link to="/addBook">Add Book</Link>
                    </li>
                    <li>
                        <Link to="/totalbook">Total Book</Link>
                    </li>
                    <li>
                        <Link to="/login">Login then Issue Book</Link>
                    </li>
                    <li>
                        <Link to="/userheldbook">User held Book</Link>
                    </li>
                  
                </ul>
            </nav>
        </div>
    );
}

export default BasicExample;
