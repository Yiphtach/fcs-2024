<%- include('partials/header') %> <!-- Include the header partial -->

<main>
  <h1>Choose Your Character from <%= universe %></h1>

  <!-- Back Button -->
  <button onclick="window.history.back()" class="back-button">Go Back</button>

  <!-- Display character options for Character 1 -->
  <form action="/fights/simulate" method="POST">
    <div class="character-selection">
      <h2>Choose Character 1</h2>
      <% characters.forEach(character => { %>
        <div class="character-option">
          <input type="radio" id="char1-<%= character._id %>" name="char1Id" value="<%= character._id %>" required aria-label="<%= character.name %>" onclick="storeSelectedCharacter('<%= character._id %>', '<%= character.name %>', '<%= character.imageUrl %>')">
          <label for="char1-<%= character._id %>"><%= character.name %></label>
        </div>
      <% }) %>
    </div>

    <!-- Selected Character 1 Display -->
    <div id="selected-character" class="selected-character" style="display: none;">
      <h2>Selected Character</h2>
      <img id="selected-image" src="" alt="Selected Character" class="character-image" style="width: 150px;">
      <p id="selected-name"></p>
    </div>

    <!-- Choose an opponent -->
    <h2>Choose Your Opponent (Character 2)</h2>
    <select name="char2Id" id="char2Id" required aria-label="Choose your opponent">
      <option value="" disabled selected>Select an opponent</option>
      <% characters.forEach(character => { %>
        <option value="<%= character._id %>"><%= character.name %></option>
      <% }) %>
    </select>
    
    <button type="submit" class="start-fight-button">Start Fight</button>
  </form>
</main>

<%- include('partials/footer') %> <!-- Include the footer partial -->

<!-- JavaScript to handle character selection logic -->
<script>
  let selectedCharacterId = ''; // Store the selected character ID for char1

  // Function to store selected Character 1 and update the Character 2 dropdown
  function storeSelectedCharacter(charId, name, imageUrl) {
    selectedCharacterId = charId;
    displaySelectedCharacter(name, imageUrl);
    updateOpponentOptions();
  }

  // Function to display the selected character's name and image
  function displaySelectedCharacter(name, imageUrl) {
    document.getElementById('selected-character').style.display = 'block';
    document.getElementById('selected-name').innerText = name;
    document.getElementById('selected-image').src = imageUrl;
  }

  // Function to dynamically update the opponent selection options
  function updateOpponentOptions() {
    const opponentSelect = document.getElementById('char2Id');
    const options = opponentSelect.options;

    // Loop through Character 2 dropdown options to disable the selected Character 1
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === selectedCharacterId) {
        options[i].disabled = true; // Disable char1 from being selected as char2
      } else {
        options[i].disabled = false; // Enable other characters as options
      }
    }
  }
</script>

<!-- Styles for layout -->
<style>
  .character-selection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  .character-option {
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 5px;
    text-align: center;
    transition: background-color 0.3s ease;
  }

  .character-option:hover {
    background-color: #e0e0e0;
  }

  .start-fight-button {
    padding: 15px 25px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    font-size: 18px;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
  }

  .start-fight-button:hover {
    background-color: #45a049;
  }

  select {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    width: 100%;
    border-radius: 5px;
  }

  .back-button {
    padding: 10px 20px;
    background-color: #555;
    color: white;
    text-decoration: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .back-button:hover {
    background-color: #333;
  }

  .selected-character {
    text-align: center;
    margin-top: 20px;
  }

  .character-image {
    border-radius: 8px;
    margin-bottom: 10px;
  }
</style>
