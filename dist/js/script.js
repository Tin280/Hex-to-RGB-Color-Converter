document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('resultLabel').textContent = "RGB: 0, 0, 0";
    document.getElementById('convertToRgb').addEventListener('click', () => {
        const resultLabel = document.getElementById('resultLabelhex');
        resultLabel.textContent = `Hex:`;
        const rgbInput = document.getElementById('rgbInput');
        rgbInput.value = '';
        let hexInput = document.getElementById('hexInput').value;
        if(hexInput == '') {
            alert("Please input Hex")
        } else {         
            hexInput = hexInput.replace('#', '');
            console.log(hexInput)
        }
        // Replace this URL with your actual API endpoint
        fetch(`http://localhost:9000/.netlify/functions/server/hex-to-rgb/${hexInput}`)
            .then(response => response.json())
            .then(data => {
                const result = `RGB: ${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b}`;
                document.getElementById('resultLabel').textContent = result;
                const { r, g, b } = data.rgb;
                const colorDisplayArea = document.getElementById('color-display-area');
                colorDisplayArea.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            });
    });

    document.getElementById('convertToHex').addEventListener('click', () => {
        const hexInput = document.getElementById('hexInput');
        hexInput.value = ''; 
        document.getElementById('resultLabel').textContent = "RGB: 0, 0, 0";
        const rgbInput = document.getElementById('rgbInput').value;
        
        let validRed, validGreen, validBlue; // Declare these variables here

        // Check if the input is empty
        if (rgbInput === '') {
            // If the input is empty, set default RGB values to 0
            validRed = 0;
            validGreen = 0;
            validBlue = 0;
        } else {
            // If the input is not empty, parse the RGB values
            const [red, green, blue] = rgbInput.split(',').map(value => parseInt(value.trim()));
            // Ensure the values are within the valid RGB range (0-255)
            validRed = Math.min(255, Math.max(0, red));
            validGreen = Math.min(255, Math.max(0, green));
            validBlue = Math.min(255, Math.max(0, blue));
            console.log(validRed, validGreen, validBlue);
        }

        fetch('http://localhost:9000/.netlify/functions/server/rgb-to-hex/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({red:validRed,green:validGreen,blue: validBlue}),
        })
        .then(response => response.json())
        .then(data => {
            const hexColor = data.hex;
            const resultLabel = document.getElementById('resultLabelhex');
            resultLabel.textContent = `Hex: ${hexColor}`;

            // Display the color
            const colorDisplayArea = document.getElementById('color-display-area');
            colorDisplayArea.style.backgroundColor = hexColor;
        });
    });
});
