import React, {useState, useRef, useEffect} from 'react';
import './DropDownIcon.css';

const DropDownIcon = ({icon, image, text, options, additionalIcon, onToggle}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (onToggle) onToggle();
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button onClick={toggleDropdown} className="flex h-full w-full items-center justify-center">
                {icon && <span>{icon}</span>}
                {image && <img src={image} alt="DropDownIcon" className="w-6 h-6"/>}
                {additionalIcon && <span>{additionalIcon}</span>}
                <span>{text}</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 shadow-lg w-40 text-black flex h-70 flex-col rounded-sm
                 border border-stroke shadow-default dark:border-strokedark dark:bg-compdark sm:right-0 sm:w-30
                 dropdown cursor-pointer z-40
                ">
                    {options.map((option, index) => (
                        <ul key={index} onClick={option.onClick} className="flex h-auto flex-col overflow-y-auto
                        cursor-pointer hover:bg-lightgreen dark:hover:bg-lightgray border-b border-gray
                        last:border-b-0 dark:text-white">
                            <li className="flex gap-4 border-t border-stroke px-2 py-3 hover:bg-gray-2 items-center
                            dark:border-strokedark dark:hover:bg-meta-4">{option.icon && <span>{option.icon}</span>}
                                {option.image && <img src={option.image} alt={option.text} className="w-8 h-8"/>}
                                <span className="text-sm font-medium dark:text-white text">{option.text}</span>
                            </li>
                        </ul>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDownIcon;