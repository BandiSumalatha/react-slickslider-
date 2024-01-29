import amazon from "../../assets/brand-images/amazon.webp";
import apple from "../../assets/brand-images/apple.webp";
import croma from "../../assets/brand-images/croma.webp";
import Dell from "../../assets/brand-images/Dell.webp";
import Hp from "../../assets/brand-images/Hp.webp";
import jbl from "../../assets/brand-images/jbl.webp";
import lenovo from "../../assets/brand-images/lenovo.webp";
import lg from "../../assets/brand-images/LG.webp";
import mi from "../../assets/brand-images/mi.webp";
import oppo from "../../assets/brand-images/oppo.webp";
import panasonic from "../../assets/brand-images/panasonic.webp";
import philips from "../../assets/brand-images/philips.webp";
import samsung from "../../assets/brand-images/Samsung.webp";
import sony from "../../assets/brand-images/sony.webp";
import vivo from "../../assets/brand-images/vivo.webp";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles(() => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#f9fbfc",
        overflow: "hidden",
        width: '100%',
        padding: '5px 0px',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto', 
   
      
    },
    arrow: {
        position: "absolute",
        zIndex: 1,
        cursor: "pointer",
        color: "black",
        boxShadow: "0 0 5px rgba(0, 0, 0, 1.5)",
    },
    arrowLeft: {

        left: "10px",


    },
    arrowRight: {
        right: "10px",

    },
    icon: {
        fontSize: "0.5rem",
        color: 'white'
    },
}));

const BrandSection = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const classes = useStyles();
    const images = [
        { id: 1, src: amazon, alt: 'Amazon' },
        { id: 2, src: apple, alt: 'Apple' },
        { id: 3, src: croma, alt: 'Croma' },
        { id: 4, src: Dell, alt: 'Dell' },
        { id: 5, src: Hp, alt: 'HP' },
        { id: 6, src: jbl, alt: 'JBL' },
        { id: 7, src: lenovo, alt: 'Lenovo' },
        { id: 8, src: lg, alt: 'LG' },
        { id: 9, src: mi, alt: 'Mi' },
        { id: 10, src: oppo, alt: 'Oppo' },
        { id: 11, src: panasonic, alt: 'Panasonic' },
        { id: 12, src: philips, alt: 'Philips' },
        { id: 13, src: samsung, alt: 'Samsung' },
        { id: 14, src: sony, alt: 'Sony' },
        { id: 15, src: vivo, alt: 'Vivo' },
    ];
    const isMobile = useMediaQuery('(max-width: 600px)');
    const itemsPerPage = isMobile ? 3 : 5;

    const totalItems = images.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = currentPage * itemsPerPage;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, totalItems);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Box className={`${classes.container}`}>
            <IconButton
                style={{
                    background: currentPage === 0 ? 'gray' : 'black',
                    borderRadius: '50px',
                    marginLeft: '10px'
                }}
                className={`${classes.arrow} ${classes.arrowLeft}`}
                onClick={handlePrev}
                disabled={currentPage === 0}
            >
                <ArrowLeftIcon className={classes.icon} />
            </IconButton>
            <Box style={{ margin: '0px 20px 0px 20px' }} className={`${classes.container}`} >
                {images.slice(startItem, endItem).map((item, index) => (
                    <div key={index} className={`${classes.container}`}>
                        <img
                            src={item.src}
                            style={{ width: "80%", height: "auto", objectFit: "cover" }}

                            alt={`slide ${index + 1}`}
                        />
                    </div>
                ))}
            </Box>
            <IconButton
                style={{
                    background: currentPage === totalPages - 1 ? 'gray' : 'black',
                    borderRadius: '50px',
                    marginRight: '30px'
                }}
                className={`${classes.arrow} ${classes.arrowRight}`}
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
            >
                <ArrowRightIcon className={classes.icon} />
            </IconButton>
        </Box>
    );
}

export default BrandSection;
