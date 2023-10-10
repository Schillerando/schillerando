<template>
  <div>
    <canvas id="test" width="145" height="225"></canvas>
    <div id="mapContainer"></div>
    <div id="error" style="display: none">Karte nicht verfügbar</div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { supabase } from '@/supabase';
import L from 'leaflet';

export default {
  name: 'MapProvider',
  props: ['data', 'companies'],
  emits: ['pickCompany'],
  setup() {
    var pin = new Image();
    pin.src = require('@/assets/pin.png');

    return {
      pin,
    };
  },
  computed: {
    standardizedPositions() {
      if (this.$props.data === null) {
        return [{ position: [0, 0] }];
      }

      return this.$props.data;
    },
    center() {
      if (this.standardizedPositions.length === 1)
        return this.standardizedPositions[0];
      else return { position: [48.935283, 9.2627305] };
    },
  },
  async mounted() {
    if (this.data != null || this.companies != null) {
      var mapWidth = document.getElementById('mapContainer');
      console.log(mapWidth.clientWidth);

      if (mapWidth.clientWidth < 450) {
        var startZoom = 17;
      } else {
        startZoom = 18;
      }

      //var startPos = [48.93452321902908, 9.263819092113069];
      var startPos = [48.93510181358248, 9.262896180152895];

      var map = L.map('mapContainer').setView(startPos, startZoom);
      map.setZoom(startZoom);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        minZoom: 16,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      window.addEventListener('resize', function () {
        var width = document.getElementById('mapContainer').clientWidth;
        if (width < 450) {
          map.setZoom(17);
        } else {
          map.setZoom(18);
        }
      });

      if ('geolocation' in navigator) {
        var marker = L.circleMarker([0, 0]).addTo(map);

        navigator.geolocation.watchPosition((position) => {
          marker.setLatLng([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        });
      } else {
        console.log(false);
      }

      map.on('click', (e) => {
        console.log(e.latlng);
      });
    } else {
      document.getElementById('mapContainer').style.display = 'none';
      document.getElementById('error').style.display = 'block';
      console.log('Illegal positions-data');
    }

    if (this.data != null) {
      this.data.forEach(async (pinData) => {
        console.log(pinData);
        var icon = await this.buildIcon(pinData.image);

        L.marker([pinData.position[0], pinData.position[1]], {
          icon: icon,
        }).addTo(map);
      });
    }

    if (this.companies != null) {
      this.companies.forEach(async (company) => {
        if (
          company.coordinates != undefined &&
          company.coordinates != null &&
          company.coordinates.length == 2
        ) {
          var image = null;

          if (
            company.header_picture != undefined &&
            company.header_picture != null
          ) {
            const response = await supabase.storage
              .from('public/sellers-headings')
              .download(company.header_picture);

            if (response.data != null) {
              image = await response.data.text();
            }
            if (response.error) console.warn(response.error);
          }

          var icon = await this.buildIcon(image);

          L.marker([company.coordinates[0], company.coordinates[1]], {
            icon: icon,
          })
            .addTo(map)
            .on('click', () => {
              var newCompany = company;
              newCompany.image = image;
              this.$emit('pickCompany', newCompany);
            });
        }
      });
    }
  },
  methods: {
    onMapClick(e) {
      console.log(e);
    },
    async buildIcon(image) {
      var canvas = document.getElementById('test');
      var ctx = canvas.getContext('2d');

      if (image == null) {
        let icon = L.icon({
          iconUrl: this.pin.src,
          iconSize: [29, 45],
          iconAnchor: [14.5, 45],
        });
        return icon;
      }

      await new Promise((resolve) => setTimeout(resolve, 50));

      var logo = new Image();
      logo.src = image;

      ctx.drawImage(this.pin, 0, 0, 145, 225);

      var width = 135;
      var height = 135;
      var x = (145 - width) / 2;
      var y = (145 - width) / 2;

      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 10);

      ctx.clip();

      if (logo.width > logo.height) {
        var scale = logo.height / width;
        var w = logo.width / scale;
        var h = height;
        var posX = (width - w) / 2;
        var posY = y;
      } else {
        scale = logo.width / width;
        h = logo.height / scale;
        w = width;
        posX = x;
        posY = (height - h) / 2;
      }

      ctx.drawImage(logo, posX, posY, w, h);

      var mergedImage = canvas.toDataURL('image/png');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let icon = L.icon({
        iconUrl: mergedImage,
        iconSize: [29, 45],
        iconAnchor: [14.5, 45],
      });
      return icon;
    },
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}

#test {
  position: absolute;
}
</style>
