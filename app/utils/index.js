import Promise from 'promise';



export default {

  /**
   * Parse supplied text to JSON and return result as Promise
   *
   * @param {String} text
   * @returns {Promise}
   */
  parseJSON: function( text ){
    // Response() provides more efficient way of JSON parsing than JSON.parse()
    // So, try to use it where it's available
    if ( typeof Response === 'function' ){
      return new Response( text ).json();
    }else{
      return new Promise( ( resolve, reject ) => {
        let data;

        try {
          data = JSON.parse( text );
        }catch( e ){
          reject( e.toString() );
        }

        resolve( data );
      });
    }
  }
}