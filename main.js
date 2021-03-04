let CustomGroups =  {

    init: function () {
        this.checkItems();
        this.checkOptionsFromServer();
        this.open();
        this.close();
        this.removeSelectedItem();
        this.toggleItem();
    },

    values: {},


    // check for placeholder and empty space
    checkItems: function() {
        document.querySelectorAll('.tm-select-group .tm-select').forEach(element => {
            if ( element.querySelectorAll('.tm-select option').length ) {
                element.nextElementSibling.classList.remove('has-placeholder');
                document.querySelector('.tm-select-group .tm-select-empty').style.display = 'none';
            } else {
                document.querySelector('.tm-select-group .tm-select-empty').style.display = 'inline-block';
            }
        });
    },


    // add options to data and print them
    checkOptionsFromServer: function() {
        document.querySelectorAll('.tm-select-group').forEach(element => {
            let selectId = element.querySelector('.tm-select').getAttribute('id');
            this.values[selectId] = [];
            element.querySelectorAll('.tm-select option').forEach( (element) => {
                this.values[selectId].push(element.value);
                document.getElementById(selectId).nextElementSibling.querySelector('.tm-select-head').insertAdjacentHTML('beforeend', '<div class="tm-selected-item" data-index="'+ element.value +'">' + element.innerHTML + '<img src="./imgs/tm-select-close-icon.svg" alt="Remove"></div>');
                document.getElementById(selectId).nextElementSibling.querySelector('.tm-options-group-item span[data-index="'+ element.value +'"]').classList.add('selected');
            });
        });
    },

    open: function() {
        document.querySelectorAll('.tm-select-group .tm-select-head').forEach(element => {
            element.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.closest('.tm-custom-select').classList.add('focus');
                e.currentTarget.closest('.tm-custom-select').classList.remove('has-placeholder');
            });
        });
    },

    close: function() {
        document.querySelectorAll('.tm-select-group .tm-select-close').forEach(element => {
            element.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.closest('.tm-custom-select').classList.remove('focus');
                e.currentTarget.closest('.tm-custom-select').classList.add('has-placeholder');
                this.checkItems();
            });
        });
    },

    toggleItem: function() {
        document.querySelectorAll('.tm-select-group .tm-options-group-item span').forEach(element => {
            element.addEventListener('click', e => {
                let value = e.currentTarget.innerHTML,
                index = e.currentTarget.dataset.index,
                selectId = element.closest('.tm-select-group').querySelector('.tm-select').getAttribute('id');
                if ( !e.currentTarget.classList.contains('selected')  ) {
                    CustomGroups.addOption(selectId, value, index);
                }
                else if ( e.currentTarget.classList.contains('selected') ) {
                    CustomGroups.removeOption(selectId, index);
                }
                e.currentTarget.classList.toggle('selected');
            });
        });
    },

    addOption: function(selectId, value, index) {
        document.getElementById(selectId).insertAdjacentHTML('beforeend', '<option selected value="' + index + '">' + value + '</option>');
        document.getElementById(selectId).nextElementSibling.querySelector('.tm-select-head').insertAdjacentHTML('beforeend', '<div class="tm-selected-item" data-index="'+ index +'">' + value + '<img src="./imgs/tm-select-close-icon.svg" alt="Remove"></div>');
        this.values[selectId].push(index);
        this.checkItems();
        this.removeSelectedItem();
        console.log(this.values);
    },

    removeOption: function(selectId, index) {
        // remove from select
        document.getElementById(selectId).querySelector('option[value="'+ index +'"]').remove();
        // remove from data array
        this.values[selectId].splice(this.values[selectId].indexOf(index), 1);
        // remove custom item
        document.getElementById(selectId).closest('.tm-select-group').querySelector('.tm-selected-item[data-index="'+ index +'"]').remove();
        this.checkItems();
    },

    // remove option on button
    removeSelectedItem: function() {
        document.querySelectorAll('.tm-select-group .tm-selected-item img').forEach(element => {
            element.addEventListener('click', e => {
                console.log(e);
                console.log(e.currentTarget);
                console.log(e.currentTarget.closest('.tm-select-group'));
                let index = e.currentTarget.closest('.tm-selected-item').dataset.index,
                selectId = e.currentTarget.closest('.tm-select-group').querySelector('.tm-select').getAttribute('id');
                // remove from select
                e.currentTarget.closest('.tm-select-group').querySelector('option[value="'+ index +'"]').remove();
                // remove from array
                this.values[selectId].splice(this.values[selectId].indexOf(index), 1);
                // remove active class in list
                e.currentTarget.closest('.tm-select-group').querySelector('.tm-options-group-item span[data-index="'+ index +'"]').classList.remove('selected');
                // remove custom item
                e.currentTarget.closest('.tm-selected-item').remove();
                this.checkItems();
                console.log(this.values);
            });
        });
    },
    
};

CustomGroups.init();

// let CustomGroups =  {

//         init: function () {
//             CustomGroups.checkOptionsFromServer();
//             CustomGroups.open();
//             CustomGroups.close();
//             CustomGroups.toggleItem();
//             CustomGroups.removeSelectedItem();
//             CustomGroups.checkProfessions();
//             CustomGroups.checkEmptyBlock();
//         },

//         values: [],

//         resultsSelect: function(array) {
//             $('#strategic-groups').empty();
//             $.each(array, function(index, id) {
//                 $('#strategic-groups').append($('<option selected></option>').val(id).html(id));
//             });
//         },

//         open: function() {
//             $('#custom-select-groups .select-title').on('click', function(event) {
//                 event.preventDefault();
//                 event.stopPropagation();
//                 $(this).closest('#custom-select-groups').addClass('focus');
//                 $('#custom-select-groups').removeClass('has-placeholder');
//             })
//         },

//         close: function() {
//             $('#custom-select-groups .custom-select-close').on('click', function(event) {
//                 event.preventDefault();
//                 event.stopPropagation();
//                 $('#custom-select-groups').removeClass('focus');
//                 CustomGroups.checkItems();
//                 CustomGroups.checkEmptyBlock();
//             })
//         },

//         toggleItem: function() {
//             $('#custom-select-groups .group-item span').click(function() {
//                 let value = $(this).text();
//                 let index = $(this).data('index');
//                 if ( !$(this).hasClass('selected')  ) {
//                     CustomGroups.addProfession(value, index);
//                 }
//                 else if ( $(this).hasClass('selected') ) {
//                     CustomGroups.removeProfession(value, index);
//                 }
//                 $(this).toggleClass('selected');
//             })
//         },

//         addProfession: function(value, index) {
//             $('#custom-select-groups .select-title').append('<div class="selected-item" data-index="'+ index +'">' + value + '<img src="/img/svg/remove-selected.svg" alt="Remove"></div>');
//             if ( this.values.indexOf(index) == -1) {
//                 this.values.push(index);
//             }
//             this.resultsSelect(this.values);
//             CustomGroups.checkEmptyBlock();
//         },

//         removeProfession: function(value, index) {
//             $('#custom-select-groups .selected-item[data-index="'+ index +'"]').remove();
//             Array.prototype.remove = function(key) {
//                 var idx = this.indexOf(key);
//                 if (idx != -1) {
//                     return this.splice(idx, 1);
//                 }
//                 return false;
//             }
//             this.values.remove(index);
//             this.resultsSelect(this.values);
//             CustomGroups.checkEmptyBlock();
//         },

//         removeSelectedItem: function() {
//             $('#custom-select-groups .select-title').on('click', '.selected-item img', function() {
//                 let index = $(this).closest('.selected-item').data('index');
//                 let value = $(this).closest('.selected-item').text();
//                 Array.prototype.remove = function(key) {
//                     var idx = this.indexOf(key);
//                     if (idx != -1) {
//                         return this.splice(idx, 1);
//                     }
//                     return false;
//                 }
//                 CustomGroups.values.remove(index);
//                 $(this).closest('.selected-item').remove();
//                 CustomGroups.resultsSelect(CustomGroups.values);
//                 $('.group-item span[data-index="'+ +index +'"]').removeClass('selected');
//                 CustomGroups.checkEmptyBlock();
//             })
//         },

//         checkItems: function() {
//             if (!this.values.length && !$('#strategic-groups option').length) {
//                 $('#custom-select-groups').addClass('has-placeholder');
//             }
            
//         },

//         checkEmptyBlock: function() {
//             if ( this.values.length || $('#strategic-groups option').length ) {
//                 $('#custom-select-groups .empty').css('display', 'none');
//             }
//             else {
//                 $('#custom-select-groups .empty').css('display', '');
//             }
//         },

//         checkProfessions: function() {
//             if ( $('#strategic-groups option').length ) {
//                 $('#custom-select-groups').removeClass('focus');
//             }
//         },

//         checkOptionsFromServer: function() {
//             if ( $('#strategic-groups option').length ) {
//                 $('#custom-select-groups').removeClass('has-placeholder');
//                 $('#strategic-groups option').each( i => {
//                     this.values.push( +$('#strategic-groups option')[i].value );
//                 });
//             }
//         },
// };

// CustomGroups.init();