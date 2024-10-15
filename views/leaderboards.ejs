<!DOCTYPE html>
<html lang="en">
<head>
    <%- include('partials/header') %>  <!-- Include the header partial -->
    <title>Leaderboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        h1 {
            font-size: 36px;
            margin-bottom: 20px;
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 12px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
        }

        tbody tr:nth-child(odd) {
            background-color: #f9f9f9;
        }

        tbody tr:nth-child(even) {
            background-color: #fff;
        }

        .view-character {
            color: #4CAF50;
            text-decoration: none;
        }

        .view-character:hover {
            text-decoration: underline;
        }

        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        .pagination a {
            margin: 0 5px;
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .pagination a:hover {
            background-color: #45a049;
        }

        .pagination a.active {
            background-color: #333;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            table, thead, tbody, th, td, tr {
                display: block;
            }
            th {
                text-align: left;
            }
            tbody tr {
                margin-bottom: 15px;
            }

            .pagination {
                flex-direction: column;
                align-items: center;
            }

            .pagination a {
                margin: 5px 0;
            }
        }
    </style>
</head>
<body>
    <h1>Leaderboard</h1>
    
    <!-- Leaderboard Table -->
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Total Fights</th>
                <th>Win Ratio</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
            <% characters.forEach((character, index) => { %>
                <tr>
                    <td><%= (currentPage - 1) * 30 + index + 1 %></td> <!-- Correct rank for each page -->
                    <td><%= character.name %></td>
                    <td><%= character.wins %></td>
                    <td><%= character.losses %></td>
                    <td><%= character.totalFights %></td>
                    <td><%= (character.wins / character.totalFights * 100).toFixed(2) %> %</td>
                    <td>
                        <a href="/characters/<%= character._id %>" class="view-character">View Details</a> <!-- Link to character details page -->
                    </td>
                </tr>
            <% }) %>
        </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
        <% if (currentPage > 1) { %>
            <a href="?page=<%= currentPage - 1 %>">Previous</a>
        <% } %>

        <% for (let i = 1; i <= totalPages; i++) { %>
            <a href="?page=<%= i %>" class="<%= i === currentPage ? 'active' : '' %>"><%= i %></a>
        <% } %>

        <% if (currentPage < totalPages) { %>
            <a href="?page=<%= currentPage + 1 %>">Next</a>
        <% } %>
    </div>

    <%- include('partials/footer') %>  <!-- Include the footer partial -->
</body>
</html>
