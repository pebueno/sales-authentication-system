import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

type SummaryCardProps = {
  title: string;
  data: { name: string; value: number }[];
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, data }) => {
  // Calculate the total amount
  // const totalAmount = data.reduce((sum, item) => sum + item.value, 0);
  const totalAmount = data.reduce((sum, item) => sum + Number(item.value), 0);
  console.log({ data });
  // Display the first two items
  const displayedItems = data.slice(0, 2);

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Total Amount: {Math.round(totalAmount).toLocaleString('en-US')}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {displayedItems.map((item, index) => (
            <Typography key={index} variant="body2" color="textPrimary">
              {item.name}: {Math.round(item.value).toLocaleString('en-US')}
            </Typography>
          ))}
          {data.length > 2 && (
            <Typography variant="body2" color="textSecondary">
              ...and {data.length - 2} more
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
