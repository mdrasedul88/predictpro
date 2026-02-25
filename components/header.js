/* Basic Reset */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Roboto', sans-serif; background-color: #f4f7f6; color: #333; line-height: 1.6; }

.container { max-width: 1100px; margin: auto; padding: 20px; }

/* Header & Nav Style */
header { background: #1a1a1a; color: #fff; padding: 15px 0; text-align: center; }
nav a { color: #fff; margin: 0 15px; text-decoration: none; font-weight: bold; }

/* Ads Placeholder */
.ads-container { background: #eee; text-align: center; padding: 10px; margin: 20px 0; border: 1px dashed #bbb; }

/* Prediction Cards */
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.card { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid #e74c3c; }
.badge { background: #e74c3c; color: #fff; padding: 2px 8px; font-size: 12px; border-radius: 4px; }
.badge.live { background: #27ae60; }
.btn { display: inline-block; margin-top: 15px; background: #1a1a1a; color: #fff; padding: 8px 15px; text-decoration: none; border-radius: 5px; }

/* Footer */
footer { background: #1a1a1a; color: #fff; text-align: center; padding: 20px; margin-top: 40px; }

