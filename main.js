document.addEventListener('DOMContentLoaded', function () {
    const kotaContainer = document.getElementById('kota-kota');

    function showKota(provinsiId) {
        const apiUrl = `https://api.goapi.io/regional/kota?provinsi_id=${provinsiId}&api_key=ac422611-26d6-5731-29cf-ad858952`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const kotaList = data.data.map(kota => `<li>${kota.name}</li>`).join('');
                    kotaContainer.innerHTML = `<ul style="list-style-type: disc">${kotaList}</ul>`; 
                } else {
                    console.error('Gagal mengambil data:', data.message);
                }
            })
            .catch(error => {
                console.error('Error dalam pengambilan data:', error);
            });
    }

    function onProvinsiSelectChange() {
        const provinsiId = this.value;
        if (provinsiId) {
            showKota(provinsiId);
        } else {
            kotaContainer.innerHTML = ''; 
        }
    }

    fetch('https://api.goapi.io/regional/provinsi?api_key=ac422611-26d6-5731-29cf-ad858952')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const provinsiSelect = document.createElement('select');
                provinsiSelect.style.fontFamily = 'Arial, sans-serif';0 
                provinsiSelect.addEventListener('change', onProvinsiSelectChange);

                data.data.forEach(provinsi => {
                    const option = document.createElement('option');
                    option.value = provinsi.id;
                    option.textContent = provinsi.name.charAt(0).toUpperCase() + provinsi.name.slice(1).toLowerCase(); 
                    provinsiSelect.appendChild(option);
                });

                document.body.insertBefore(provinsiSelect, kotaContainer);
            } else {
                console.error('Gagal mengambil data:', data.message);
            }
        })
        .catch(error => {
            console.error('Error dalam pengambilan data:', error);
        });
});
