import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai"; // React Icons
import { FaAngleDown, FaAngleUp, FaSearch } from "react-icons/fa"; // Dropdown Icons
import vectorImage from "../../assets/Vector.png";
import closeImage from "../../assets/Vector 11.png";
import "./SlideOverCard.css" // Vector image import
import { IoReloadOutline } from "react-icons/io5";
import { TfiInfoAlt } from "react-icons/tfi";
import { ReactComponent as HeroIcon } from "../../assets/creation.svg";

interface SlideOverCardProps {
    isOpen: boolean;
    onClose: () => void;
}

const SlideOverCard: React.FC<SlideOverCardProps> = ({ isOpen, onClose }) => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showPrimaryDropdown, setShowPrimaryDropdown] = useState(false);
    const [showSecondaryDropdown, setShowSecondaryDropdown] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
    const [contextVisible, setContextVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        return () => {
            if (hoverTimer) {
                clearTimeout(hoverTimer);
            }
        };
    }, []);

    const handleMouseEnter = (categoryName: string) => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
        }
        setHoveredCategory(categoryName);
        if (categoryName === "Co2 Distribution") {
            setContextVisible(true);
        }
    };

    const handleMouseLeave = () => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
        }
        if (hoveredCategory === "Co2 Distribution") {
            const timer = setTimeout(() => {
                setContextVisible(false);
                setHoveredCategory(null);
            }, 1500); // 1.5 second delay
            setHoverTimer(timer);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleRerun = () => {
        console.log("Rerun Variables with updated values");
    };

    const variables = [
        {
            title: "Variable category 1",
            categories: [
                { id: 1, name: "Carbon 1" },
                { id: 2, name: "Co2 Distribution" },
                { id: 3, name: "Fleet sizing" },
            ],
        },
        {
            title: "Variable category 2",
            categories: [
                { id: 4, name: "Parking Rate" },
                { id: 5, name: "Border Rate" },
                { id: 6, name: "Request Rate" },
                { id: 10, name: "Variable 1" },
                { id: 11, name: "Variable 1" },
                { id: 12, name: "Variable 1" },
            ],
        },
        {
            title: "Variable category 3",
            categories: [
                { id: 7, name: "Variable 1" },
                { id: 8, name: "Variable 1" },
                { id: 9, name: "Variable 1" },
            ],
        },
    ];

    const toggleCategory = (id: number) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((categoryId) => categoryId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className={`slide-over-card ${isOpen ? "open" : ""}`}>
            <div className="slide-over-card-content" ref={cardRef}>
                <div className="edit-variables-header">
                    <h3>Edit Variables</h3>
                    <button className="close-btn" onClick={onClose}>
                        <img src={closeImage} alt="Close" />
                    </button>

                </div>
                <div className="search-section">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-field"
                        placeholder="Search Variables"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="autofill-button">
                        <img src={vectorImage} alt="vector" style={{ width: '22px', height: '22px' }} /> Autofill
                    </button>
                    <button className="rerun-button" onClick={handleRerun}>
                        <IoReloadOutline style={{ width: '20px', height: '22px' }} /> Rerun
                    </button>
                </div>

                <div className="variables-container">
                    {variables.map((variable, index) => (
                        <div key={index} className="variable-group">
                            <h4 className="variable-title">{variable.title}</h4>
                            <div className="categories-grid">
                                {variable.categories.map((category) => {
                                    const isSelected = selectedCategories.includes(category.id);
                                    return (
                                        <div
                                            key={category.id}
                                            className={`category-card ${isSelected ? "selected" : ""}`}
                                            onClick={() => toggleCategory(category.id)}
                                            onMouseEnter={() => handleMouseEnter(category.name)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <span className="category-name">{category.name}</span>
                                            <HeroIcon
                                                className={`vector-icon ${isSelected ? "selected-vector" : ""}`}
                                            />
                                            <div className="icon-wrapper">
                                                {isSelected ? (
                                                    <AiOutlineCheck className="tick-icon" />
                                                ) : (
                                                    <AiOutlinePlus className="plus-icon" />
                                                )}
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                {contextVisible && hoveredCategory === "Co2 Distribution" && (
                    <div className="context-window">
                        <h4 className="title">Co2 Distribution<span className="icon"><TfiInfoAlt /></span></h4>
                        <p className="description">But what truly sets Switch apart is its versatility. It can be used
                            as a scooter, a bike, or even a skateboard, making it suitable for
                            people of all ages. Whether you're a student, a professional, or a
                            senior citizen, Switch adapts to your needs and lifestyle.</p>
                    </div>
                )}

                <div className="dropdown-section">
                    <button
                        className="dropdown-button"
                        onClick={() => setShowPrimaryDropdown(!showPrimaryDropdown)}
                    >
                        Primary Variables
                        {showPrimaryDropdown ? (
                            <FaAngleUp className="dropdown-icon" />
                        ) : (
                            <FaAngleDown className="dropdown-icon" />
                        )}
                    </button>
                    {showPrimaryDropdown && (
                        <div className="dropdown-content">
                            <div>Primary Variable 1</div>
                            <div>Primary Variable 2</div>
                            <div>Primary Variable 3</div>
                        </div>
                    )}
                </div>
                <div className="dropdown-section">
                    <button
                        className="dropdown-button"
                        onClick={() => setShowSecondaryDropdown(!showSecondaryDropdown)}
                    >
                        Secondary Variables
                        {showSecondaryDropdown ? (
                            <FaAngleUp className="dropdown-icon" />
                        ) : (
                            <FaAngleDown className="dropdown-icon" />
                        )}
                    </button>
                    {showSecondaryDropdown && (
                        <div className="dropdown-content">
                            <div>Secondary Variable 1</div>
                            <div>Secondary Variable 2</div>
                            <div>Secondary Variable 3</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SlideOverCard;
