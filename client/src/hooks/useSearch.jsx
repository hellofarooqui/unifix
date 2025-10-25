import axios from 'axios';

const useSearch = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const getSearchResults = async (searchTerm) => {
      try {
        const response = await axios.get(`${serverUrl}/api/search`, {
          params: {
            term: searchTerm,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          //console.log(response.data)
          return response.data;
        } else {
          throw new Error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        throw error; // Re-throw the error for further handling
      }
    };

    return { getSearchResults };
}

export default useSearch;

