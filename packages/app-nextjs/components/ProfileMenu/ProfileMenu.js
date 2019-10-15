import React from 'react';
import Link from 'next/link';

const ProfileMenu = ({ show, onLogout }) => {
    return (
        <React.Fragment>
            {show && (
                <div className={`panel-container ${show ? 'open' : ''}`}>
                    <div className="panel">
                        <Link href="/profile">
                            <a className="profile-link">My Profile</a>
                        </Link>
                        <p className="profile-link" onClick={onLogout}>
                            Logout
                        </p>
                    </div>
                </div>
            )}
            <style jsx>{`
                .panel-container {
                    font-family: 'Arial';
                    position: relative;
                }

                .panel {
                    position: absolute;
                    top: 20px;
                    right: 0px;
                    padding-top: 15px;
                    border: 1px solid #ddd;
                    width: 150px;
                    box-shadow: 5px 5px 8px #ccc;
                    border-radius: 8px;
                    background-color: #fff;
                    z-index: 10;
                }

                .profile-link {
                    text-decoration: none;
                    cursor: pointer;
                    margin-left: 25px;
                    color: #022c43;
                }

                .profile-link:hover {
                    color: #ccc;
                }

                @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
                    .panel {
                        right: -10px;
                    }
                }
            `}</style>
        </React.Fragment>
    );
};

export default ProfileMenu;
