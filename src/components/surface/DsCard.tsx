import * as React from 'react';
import Box from '@mui/material/Box';
import Card, { CardProps as MuiCardProps } from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * A small bullet character for use in text, styled as in the MUI example.
 * Exported for convenience if you want to construct titles like "be•nev•o•lent".
 */
export const Bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

// MuiCardProps에서 'title' 및 'content' 속성을 제외하도록 수정합니다.
export interface DsCardProps extends Omit<MuiCardProps, 'title' | 'content'> { // <--- 이 부분을 수정했습니다.
    /**
     * Text or element to display as an overline, typically smaller and secondary.
     * e.g., "Word of the Day"
     */
    overline?: React.ReactNode;
    /**
     * The main title of the card.
     * e.g., "benevolent" or `be{Bull}nev{Bull}o{Bull}lent`
     */
    title?: React.ReactNode;
    /**
     * Text or element to display as a subheader below the title.
     * e.g., "adjective"
     */
    subheader?: React.ReactNode;
    /**
     * The main content/body of the card.
     */
    content?: React.ReactNode; // 이제 이 content 정의가 충돌 없이 사용됩니다.
    /**
     * Text for the action button at the bottom of the card.
     * If provided, an action button will be rendered.
     * e.g., "Learn More"
     */
    actionText?: string;
    /**
     * Callback fired when the action button is clicked.
     */
    onActionClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: 'outlined' | 'elevation';
    // children prop is inherited from MuiCardProps
}

/**
 * DsCard is a basic card component based on MUI's Card.
 * It provides a structured way to display content (overline, title, subheader, content, and an action button).
 * Alternatively, you can pass `children` directly for a custom card interior.
 */
export const DsCard: React.FC<DsCardProps> = ({
                                                  overline,
                                                  title,
                                                  subheader,
                                                  content,
                                                  actionText,
                                                  onActionClick,
                                                  children,
                                                  variant = 'outlined', // Default variant from the example
                                                  ...rest
                                              }) => {
    // Determine if structured content props are provided
    const hasStructuredContentProps = Boolean(overline || title || subheader || content || actionText);

    return (
        <Card variant={variant} {...rest}>
            {hasStructuredContentProps ? (
                <React.Fragment>
                    <CardContent>
                        {overline && (
                            <Typography sx={{ fontSize: 14, color: 'text.secondary' }} gutterBottom>
                                {overline}
                            </Typography>
                        )}
                        {title && (
                            <Typography variant="h5" component="div">
                                {title}
                            </Typography>
                        )}
                        {subheader && (
                            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                                {subheader}
                            </Typography>
                        )}
                        {content && (
                            <Typography variant="body2">
                                {content}
                            </Typography>
                        )}
                    </CardContent>
                    {actionText && ( // Render CardActions only if actionText is provided
                        <CardActions>
                            <Button size="small" onClick={onActionClick}>
                                {actionText}
                            </Button>
                        </CardActions>
                    )}
                </React.Fragment>
            ) : (
                // If no structured content props are used, render children directly.
                // This allows for full customization of the card's interior.
                children
            )}
        </Card>
    );
};