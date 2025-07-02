import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    AccordionProps as MuiAccordionProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface DsAccordionProps extends MuiAccordionProps {
    title: string;
    defaultExpanded?: boolean;
}

const DsAccordion: React.FC<DsAccordionProps> = ({
                                                     title,
                                                     children,
                                                     defaultExpanded = false,
                                                     ...rest
                                                 }) => {
    return (
        <Accordion defaultExpanded={defaultExpanded} {...rest}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default DsAccordion;
