import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const BarChartComponent = ({ data }) => {
  return (
    <Card className="p-4 flex-1">
      <CardHeader>
        <h2 className="text-lg font-semibold">Business Overview</h2>
        <p className="text-sm text-muted-foreground">Compare total product value with revenue earned</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={290}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                maximumFractionDigits: 1
              }).format(value)}
            />
            <Tooltip 
              formatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value)}
              labelStyle={{ color: '#666' }}
            />
            <Legend />
            <Bar dataKey="Initial Amount" fill="#8884d8" name="Product Value" />
            <Bar dataKey="Amount Earned" fill="#22c55e" name="Sales Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
