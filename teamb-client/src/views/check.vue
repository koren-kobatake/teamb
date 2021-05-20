<template>
    <div class="wrapper">
        <div class="drop_area" 
            @dragenter="dragEnter" 
            @dragleave="dragLeave" 
            @dragover.prevent 
            @drop.prevent="dropFile"
            :class="{enter: isEnter}">
            ファイルアップロード
        </div>
        <div>
            <ul>
                <li v-for="file in files" :key="file.id">{{ file.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEnter: false,
            files: [],
            
        };
    },
    methods: {
        dragEnter() {
            console.log('Enter Drop Area');
            this.isEnter = true;
        },
        dragLeave() {
            this.isEnter = false;
        },
        dragOver() {
            console.log('DragOver')
        },
        dropFile(event) {
            this.files = [...event.dataTransfer.files]
            this.isEnter = false;
            const XLSX = require("xlsx");
            // FileListオブジェクトの配列から、一つ目のFileオブジェクトを取り出す
            var file = this.files[0];

            console.log('1');
            // ファイルリード（ファイル読み込み後に実行する部分）
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log('2');
                // ブラウザからのファイルリード結果を変数に保存
                var data = e.target.result;
                console.log(data);

                console.log('3');
                // バイナリデータを型つき配列（Uint8Array）に変換
                var arr = "",
                    l = 0,
                    w = 10240;
                for (; l < data.byteLength / w; ++l) arr += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w,
                    l * w + w)));
                arr += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                console.log(arr);

                console.log('4');
                // Uint8Array形式のデータをワークブックデータとして読み込む（sheetjsを利用）
                var workbook;
                workbook = XLSX.read(btoa(arr), {
                    type: 'base64',
                    cellDates: true,
                });
                console.log(workbook);

                console.log('5');
                var sheet1 = workbook.Sheets["Sheet1"];
                console.log(sheet1);
            };

            // FileオブジェクトをArrayBufferとしてメモリ上に読み込む。（読み込んだらonload部分を実行する）
            reader.readAsArrayBuffer(file);
        },
    },
}
</script>
<style>
.drop_area {
    color: gray;
    font-weight: bold;
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 300px;
    border: 5px solid gray;
    border-radius: 15px;
}
.enter {
    border: 10px dotted powderblue;
}
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center; /*左右中央揃え*/
    align-items: center;     /*上下中央揃え*/
}
</style>
