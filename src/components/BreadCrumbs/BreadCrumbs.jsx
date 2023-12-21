import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.css';

const BreadCrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    if (pathnames.length <= 1 && (pathnames[0] === 'home' || location.pathname === '/')) {
        return null;
    }

    return (
        <nav aria-label="breadcrumb" className={'py-1.5'}>
            <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                </li>
                {pathnames.map((name, index) => {
                    if (name === 'home') return null;
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <li key={name} className={`breadcrumb-item ${isLast ? 'text-green font-bold' : ''}`}>
                            {isLast ? capitalize(name) : <Link to={routeTo}>{capitalize(name)}</Link>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;