<script lang="ts">
    import { onMount } from 'svelte';
    import { formatArticles } from '../lib/utils/formatArticles'
    import type { Article } from '../lib/types/Article'
    import ArtComp from '../lib/components/ArtComp.svelte'

    let articles: Article[] = $state([]);
    let containsArticles = $state();
    /**
     * 1. Fetch API Key
     *
     * 2. Query NYT API for Davis and Sacramento articles
     *
     * 3. Using the result of the queries, format into Article objects
     * 
     * 4. Use the Article objects to display on website based on the section field.
     */
    onMount(async () => {
      try {
        const r = await fetch('http://localhost:8000/contains_articles');
			  let res = await r.json();
        containsArticles = res.state;
        console.log(containsArticles);
        if (containsArticles === false) {
          // get nytimes articles
			    let city = "Davis CA";
			    const reqD = await fetch(`http://localhost:8000/get_articles?city=${city}`);
			    let davisArticles = await reqD.json();
          let formatedD = await formatArticles(davisArticles.response.docs);
          city = "Sacramento CA";
          const reqS = await fetch(`http://localhost:8000/get_articles?city=${city}`);
          let sacArticles = await reqS.json();
          let formatedS = await formatArticles(sacArticles.response.docs);
          articles = formatedS.concat(formatedD);
          for (let i = 0; i < articles.length; i++) {
            const response = await fetch('http://localhost:8000/post_article', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(articles[i])
            });
            const temp = await response.json();
            let id_data = temp.inserted_id;
            console.log(id_data);
          }
          containsArticles = true;
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    });
  
    let loggedIn = $state(false);
  </script>
  
  <main>
    <div class="grid-container">
      {#if articles}
      <section class="main">
        <!-- filters sectioned articles -->
        {#each articles.filter(a => a.section === 'main') as article}
          <ArtComp data={article} />
        {/each}
  
      </section>
  
    <hr>
    
      <section class="left">
      <!-- filters sectioned articles -->
      {#each articles.filter(a => a.section === 'left') as article}
          <ArtComp data={article} />
        {/each}
  
      </section>
    
      <section class="right">
      <!-- filters sectioned articles -->
      {#each articles.filter(a => a.section === 'right') as article}
          <ArtComp data={article} />
        {/each}
  
      </section>
    {/if}
    </div>
  </main>
  