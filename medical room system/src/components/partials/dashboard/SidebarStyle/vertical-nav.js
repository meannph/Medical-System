import React, { useState, useContext, memo, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, useAccordionButton, AccordionContext } from 'react-bootstrap'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import StorageIcon from '@mui/icons-material/Storage';

function CustomToggle({ children, eventKey, onClick }) {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}

const VerticalNav = memo((props) => {
    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')
    //location
    let location = useLocation();
    return (
        <Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Pages</span>
                    </Link>
                </li>
                <li className={`${location.pathname === '/user' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/user' ? 'active' : ''} nav-link `} aria-current="page" to="/user" onClick={() => { }}>
                        <AccountBoxIcon />
                        <span className="item-name">User Accont</span>
                    </Link>
                </li>
                <Accordion.Item as="li" eventKey="horizontal-menu" bsPrefix={`nav-item ${active === 'menustyle' ? 'active' : ''} `} onClick={() => setActive('menustyle')}  >
                    <CustomToggle eventKey="horizontal-menu" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <DriveFileRenameOutlineIcon />
                        <span className="item-name">Master</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="horizontal-menu" >
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/location' ? 'active' : ''} nav-link`} to="/location">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> M </i>
                                    <span className="item-name">Medical Room</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/cabinet' ? 'active' : ''} nav-link`} to="/cabinet">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> C </i>
                                    <span className="item-name">Medical Box</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/unit' ? 'active' : ''} nav-link`} to="/unit">
                                    <i className="icon svg-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> U </i>
                                    <span className="item-name">Medicine Unit</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/medicine' ? 'active' : ''} nav-link`} to="/medicine">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> I </i>
                                    <span className="item-name">Medicine Item</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '/masterstock' ? 'active' : ''} nav-link`} to="/masterstock">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> B </i>
                                    <span className="item-name">เหตุผลการปรับ stock</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <li className="nav-item">
                    <Link className={`${location.pathname === '#' ? 'active' : ''} nav-link `} aria-current="page" target="blank" to="#">
                        <AssignmentIcon />
                        <span className="item-name">บันทึกห้องพยาบาล</span>
                    </Link>
                </li>
                <Accordion.Item as="li" eventKey="sidebar-special" bsPrefix={`nav-item ${active === 'special' ? 'active' : ''} `} onClick={() => setActive('special')}>
                    <CustomToggle eventKey="sidebar-special" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <StorageIcon />
                        <span className="item-name">Stock</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-special" >
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === '#' ? 'active' : ''} nav-link`} to="#">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> B </i>
                                    <span className="item-name">เพิ่ม Stock</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '#' ? 'active' : ''} nav-link`} to="#">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> C </i>
                                    <span className="item-name">ลด Stock</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`${location.pathname === '#' ? 'active' : ''} nav-link`} to="#">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> K </i>
                                    <span className="item-name">โอน Stock</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

            </Accordion>
        </Fragment>
    )
})

export default VerticalNav
