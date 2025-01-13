// pages/api/movies.js
import { supabase } from '../../lib/supabaseService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { keyword, column, random } = req.query;
    console.log(req.query);
    if (random == 'true') {
      const totalRows = 1000; // Replace this with your actual row count

      // Generate a random starting index
      const randomStart = Math.floor(Math.random() * (totalRows - 50)); // Ensures we have at least 50 rows available

      // Calculate the end range
      const randomEnd = randomStart + 50;

      // Fetch the rows from the random range
      const { data, error } = await supabase
        .from('netflix_list') // Replace 'movies' with your table name
        .select('*')
        .range(randomStart, randomEnd);

      if (error) {
        console.error(error);
      } else {
        res.status(200).json(data);
      }
    } else {
      const { data, error } = await supabase
        .from('netflix_list')
        .select('*')
        .ilike(`${column}`, `%${keyword}%`);

      if (error) return res.status(500).json({ error: error.message });
      res.status(200).json(data);
    }
  }
}
