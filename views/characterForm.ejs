<%- include('partials/header') %> <!-- Include the header partial -->

<main>
    <h1><%= character ? 'Edit' : 'Create' %> Character</h1>

    <!-- Character Form -->
    <form action="<%= character ? `/characters/${character._id}?_method=PUT` : '/characters' %>" method="POST" class="character-form">
        <!-- Character Name -->
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value="<%= character ? character.name : '' %>" required placeholder="Enter character name">

        <!-- Universe -->
        <label for="universe">Universe</label>
        <select id="universe" name="universe" required>
            <option value="">Select Universe</option>
            <option value="Marvel" <%= character && character.universe === 'Marvel' ? 'selected' : '' %>>Marvel</option>
            <option value="DC" <%= character && character.universe === 'DC' ? 'selected' : '' %>>DC</option>
            <option value="Other" <%= character && character.universe === 'Other' ? 'selected' : '' %>>Other</option>
        </select>

        <!-- Stats -->
        <fieldset>
            <legend>Stats (0-100)</legend>
            <label for="strength">Strength</label>
            <input type="number" id="strength" name="stats[strength]" value="<%= character ? character.stats.strength : '' %>" min="0" max="100" required placeholder="Strength">

            <label for="speed">Speed</label>
            <input type="number" id="speed" name="stats[speed]" value="<%= character ? character.stats.speed : '' %>" min="0" max="100" required placeholder="Speed">

            <label for="durability">Durability</label>
            <input type="number" id="durability" name="stats[durability]" value="<%= character ? character.stats.durability : '' %>" min="0" max="100" required placeholder="Durability">

            <label for="power">Power</label>
            <input type="number" id="power" name="stats[power]" value="<%= character ? character.stats.power : '' %>" min="0" max="100" required placeholder="Power">

            <label for="combat">Combat</label>
            <input type="number" id="combat" name="stats[combat]" value="<%= character ? character.stats.combat : '' %>" min="0" max="100" required placeholder="Combat">

            <label for="intelligence">Intelligence</label>
            <input type="number" id="intelligence" name="stats[intelligence]" value="<%= character ? character.stats.intelligence : '' %>" min="0" max="100" required placeholder="Intelligence">
        </fieldset>

        <!-- Abilities (Editable, with Default Abilities) -->
        <fieldset>
            <legend>Abilities</legend>
            <div id="abilities">
                <% if (character && character.abilities.length > 0) { %>
                    <% character.abilities.forEach((ability, index) => { %>
                        <label for="ability-<%= index %>">Ability <%= index + 1 %></label>
                        <input type="text" id="ability-<%= index %>" name="abilities[<%= index %>][name]" value="<%= ability.name %>" placeholder="Enter ability name">
                        <input type="number" name="abilities[<%= index %>][powerLevel]" value="<%= ability.powerLevel %>" min="0" max="100" placeholder="Power Level">
                    <% }) %>
                <% } else { %>
                    <label for="ability-0">Ability 1</label>
                    <input type="text" id="ability-0" name="abilities[0][name]" placeholder="Enter ability name">
                    <input type="number" name="abilities[0][powerLevel]" min="0" max="100" placeholder="Power Level">
                <% } %>
            </div>
            <button type="button" onclick="addAbility()">Add Ability</button>
        </fieldset>

        <!-- Submit Button -->
        <button type="submit" class="btn-submit"><%= character ? 'Update' : 'Create' %> Character</button>
    </form>
</main>

<%- include('partials/footer') %> <!-- Include the footer partial -->

<!-- JavaScript to Dynamically Add Abilities -->
<script>
    function addAbility() {
        const abilitiesDiv = document.getElementById('abilities');
        const newIndex = abilitiesDiv.children.length / 2;  // Each ability has two inputs (name and powerLevel)
        const label = document.createElement('label');
        label.textContent = `Ability ${newIndex + 1}`;
        label.setAttribute('for', `ability-${newIndex}`);

        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('id', `ability-${newIndex}`);
        inputName.setAttribute('name', `abilities[${newIndex}][name]`);
        inputName.setAttribute('placeholder', 'Enter ability name');

        const inputPowerLevel = document.createElement('input');
        inputPowerLevel.setAttribute('type', 'number');
        inputPowerLevel.setAttribute('name', `abilities[${newIndex}][powerLevel]`);
        inputPowerLevel.setAttribute('min', '0');
        inputPowerLevel.setAttribute('max', '100');
        inputPowerLevel.setAttribute('placeholder', 'Power Level');

        abilitiesDiv.appendChild(label);
        abilitiesDiv.appendChild(inputName);
        abilitiesDiv.appendChild(inputPowerLevel);
    }
</script>

<!-- CSS Styles -->
<style>
    main {
        padding: 20px;
        text-align: center;
    }

    h1 {
        font-size: 36px;
        margin-bottom: 20px;
        color: #333;
    }

    .character-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 600px;
        margin: 0 auto;
    }

    .character-form label {
        margin-top: 10px;
        font-size: 18px;
        color: #333;
    }

    .character-form input,
    .character-form select {
        padding: 10px;
        font-size: 16px;
        width: 100%;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .character-form input[type="number"] {
        max-width: 120px;
    }

    .btn-submit {
        margin-top: 20px;
        padding: 15px 30px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 18px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-submit:hover {
        background-color: #45a049;
    }

    fieldset {
        margin-top: 20px;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
    }

    legend {
        padding: 0 10px;
        font-weight: bold;
        color: #333;
    }

    button[type="button"] {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }

    button[type="button"]:hover {
        background-color: #0056b3;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .character-form {
            width: 90%;
        }

        .btn-submit {
            width: 100%;
        }
    }
</style>
